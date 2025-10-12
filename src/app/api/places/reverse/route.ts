import { NextResponse } from 'next/server';

const MAPBOX_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

function getToken() {
  return process.env.MAPBOX_GEOCODING_ACCESS_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
}

function normalizeNumber(value: unknown) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function isValidLatitude(value: number) {
  return value >= -90 && value <= 90;
}

function isValidLongitude(value: number) {
  return value >= -180 && value <= 180;
}

export async function POST(request: Request) {
  const token = getToken();

  if (!token) {
    return NextResponse.json(
      { error: 'Missing Mapbox access token. Set MAPBOX_GEOCODING_ACCESS_TOKEN or NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN.' },
      { status: 500 },
    );
  }

  let body: { coordinates?: { lat?: unknown; lng?: unknown } | unknown; languageCode?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body. Expected JSON.' }, { status: 400 });
  }

  const coordinatesInput = body?.coordinates;

  if (typeof coordinatesInput !== 'object' || coordinatesInput === null) {
    return NextResponse.json({ error: 'The "coordinates" field is required.' }, { status: 400 });
  }

  const lat = normalizeNumber((coordinatesInput as Record<string, unknown>).lat);
  const lng = normalizeNumber((coordinatesInput as Record<string, unknown>).lng);

  if (lat === null || lng === null) {
    return NextResponse.json({ error: 'Invalid coordinates provided. Expected numeric latitude and longitude.' }, { status: 400 });
  }

  if (!isValidLatitude(lat) || !isValidLongitude(lng)) {
    return NextResponse.json({ error: 'Coordinates out of bounds. Latitude must be between -90 and 90, longitude between -180 and 180.' }, { status: 400 });
  }

  const languageCode = typeof body.languageCode === 'string' ? body.languageCode : 'fr';

  const params = new URLSearchParams({
    access_token: token,
    language: languageCode,
    limit: '1',
    types: ['poi', 'address', 'place', 'locality', 'region'].join(','),
  });

  const url = `${MAPBOX_ENDPOINT}/${lng},${lat}.json?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        error: 'Failed to fetch place information from Mapbox Geocoding API.',
        details: errorText,
      },
      { status: 502 },
    );
  }

  const data = (await response.json()) as {
    features?: Array<{
      id: string;
      place_name?: string;
      text?: string;
      center?: [number, number];
      place_type?: string[];
      properties?: {
        address?: string;
        category?: string;
        maki?: string;
        wikidata?: string;
        foursquare?: string;
        landmark?: boolean;
      };
    }>;
  };

  const feature = data.features?.[0];

  if (!feature?.center) {
    return NextResponse.json(
      {
        place: {
          id: `${lat.toFixed(6)},${lng.toFixed(6)}`,
          name: 'Point sélectionné',
          formattedAddress: '',
          coordinates: { lat, lng },
          types: [],
          mapboxProperties: feature?.properties ?? {},
        },
        warning: 'No detailed information returned for these coordinates.',
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    place: {
      id: feature.id,
      name: feature.text ?? feature.place_name ?? 'Point sélectionné',
      formattedAddress: feature.place_name ?? '',
      coordinates: {
        lat: feature.center[1],
        lng: feature.center[0],
      },
      types: feature.place_type ?? [],
      mapboxProperties: feature.properties ?? {},
    },
  });
}

