// src/lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  console.log(`📡 Fetching: ${url}`)
  const response = await fetch(url, { ...options, headers })

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ API Error (${response.status}): ${response.statusText} - ${errorText} at ${url}`)
    
    // Try to parse nice error message if it's JSON
    let message = errorText;
    try {
      const parsed = JSON.parse(errorText);
      message = Object.entries(parsed).map(([k, v]) => `${k}: ${v}`).join(', ');
    } catch(e) {}

    throw new Error(message || `API error: ${response.statusText} (${response.status})`)
  }

  // Handle empty responses (like 204 No Content)
  if (response.status === 204) return null;
  
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const endpoints = {
  stats: '/impact/stats/',
  applications: '/applications/',
  beneficiaries: '/beneficiaries/',
  donations: '/donate/',
  events: '/events/',
  blog: '/blog/',
  team: '/management/team/',
  partners: '/management/partners/',
}
