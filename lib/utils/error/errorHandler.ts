import { NextResponse } from 'next/server';

export function apiRes(error: unknown, defaultMessage = 'Internal server error', status = 500) {
  const message = error instanceof Error ? error.message : defaultMessage;

  console.error('API Error:', error);

  return NextResponse.json({ message }, { status });
}
