import { NextResponse } from 'next/server';

const MAPBOX_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

function getToken() {
  return process.env.MAPBOX_GEOCODING_ACCESS_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
}

export async function POST(request: Request) {
  const token = getToken();

  if (!token) {
    return NextResponse.json(
      { error: 'Missing Mapbox access token. Set MAPBOX_GEOCODING_ACCESS_TOKEN or NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN.' },
      { status: 500 },
    );
  }

  let body: { placeId?: unknown; languageCode?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body. Expected JSON.' },
      { status: 400 },
    );
  }

  const placeId = typeof body.placeId === 'string' ? body.placeId : '';
  if (!placeId) {
    return NextResponse.json(
      { error: 'The "placeId" field is required.' },
      { status: 400 },
    );
  }

  const languageCode = typeof body.languageCode === 'string' ? body.languageCode : 'fr';

  const params = new URLSearchParams({
    access_token: token,
    language: languageCode,
    limit: '1',
  });

  const url = `${MAPBOX_ENDPOINT}/${encodeURIComponent(placeId)}.json?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        error: 'Failed to fetch place details from Mapbox Geocoding API.',
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
      { error: 'The selected place does not include location coordinates.' },
      { status: 422 },
    );
  }

  return NextResponse.json({
    place: {
      id: feature.id,
      name: feature.text ?? feature.place_name ?? '',
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
