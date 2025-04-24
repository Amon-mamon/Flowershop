import { NextResponse } from 'next/server';

export function apiRes(error: unknown, defaultMessage = '', status = 500) {
  const message = error instanceof Error ? error.message : defaultMessage;

  console.error('API Error:', error);

  return NextResponse.json({ message }, { status });
}
