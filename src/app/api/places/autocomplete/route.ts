import { NextResponse } from 'next/server';

const MAPBOX_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const DEFAULT_TYPES = ['place', 'locality', 'poi', 'region', 'address'];

function getToken() {
  return process.env.MAPBOX_GEOCODING_ACCESS_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
}

function extractSecondaryText(primary: string, placeName: string | undefined) {
  if (!placeName) {
    return undefined;
  }

  if (placeName.startsWith(`${primary}, `)) {
    return placeName.slice(primary.length + 2);
  }

  return placeName !== primary ? placeName : undefined;
}

export async function POST(request: Request) {
  const token = getToken();

  if (!token) {
    return NextResponse.json(
      { error: 'Missing Mapbox access token. Set MAPBOX_GEOCODING_ACCESS_TOKEN or NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN.' },
      { status: 500 },
    );
  }

  let body: { input?: unknown; languageCode?: unknown; limit?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body. Expected JSON.' },
      { status: 400 },
    );
  }

  const rawInput = typeof body.input === 'string' ? body.input.trim() : '';
  if (!rawInput) {
    return NextResponse.json(
      { error: 'The "input" field is required.' },
      { status: 400 },
    );
  }

  const languageCode = typeof body.languageCode === 'string' ? body.languageCode : 'fr';
  const limit = typeof body.limit === 'number' ? Math.min(Math.max(body.limit, 1), 10) : 8;

  const params = new URLSearchParams({
    access_token: token,
    autocomplete: 'true',
    language: languageCode,
    limit: String(limit),
    types: DEFAULT_TYPES.join(','),
  });

  const url = `${MAPBOX_ENDPOINT}/${encodeURIComponent(rawInput)}.json?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        error: 'Failed to fetch place suggestions from Mapbox Geocoding API.',
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
      context?: Array<{ text?: string }>;
    }>;
  };

  const suggestions = Array.isArray(data.features) ? data.features : [];

  const normalized = suggestions.map((feature) => {
    const primaryText = feature.text?.trim() || feature.place_name?.split(',')[0]?.trim() || rawInput;
    const secondaryText = extractSecondaryText(primaryText, feature.place_name);

    return {
      placeId: feature.id,
      fullText: feature.place_name ?? primaryText,
      primaryText,
      secondaryText,
      coordinates: feature.center
        ? { lat: feature.center[1], lng: feature.center[0] }
        : undefined,
      types: feature.place_type ?? [],
    };
  });

  return NextResponse.json({ suggestions: normalized });
}
