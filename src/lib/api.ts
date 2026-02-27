export async function analyzeGithub(username: string) {
  try {
    const response = await fetch('/api/github/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GitHub analysis API error:', errorData);
      throw new Error(errorData.error || `GitHub analysis failed with status ${response.status}`);
    }
    return response.json();
  } catch (error: any) {
    console.error('Fetch error in analyzeGithub:', error);
    throw error;
  }
}

export async function renderPortfolio(templateId: string, data: any) {
  const response = await fetch('/api/portfolio/render', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ templateId, data }),
  });
  if (!response.ok) {
    throw new Error('Failed to render portfolio');
  }
  return response.text();
}
export async function generatePortfolio(confirmedSections: any, templateId: string) {
  const response = await fetch('/api/portfolio/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ confirmedSections, templateId }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Portfolio generation failed');
  }
  return response.json();
}
