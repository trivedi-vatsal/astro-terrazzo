/**
 * Show a short status message in a shared live region, so screen readers
 * announce it too. Styles live in styles.css (.toast-region, .toast).
 */
export function toast(message: string, duration = 2000): void {
  let region = document.getElementById('toast-region')
  if (!region) {
    region = document.createElement('div')
    region.id = 'toast-region'
    region.className = 'toast-region'
    region.setAttribute('role', 'status')
    document.body.append(region)
  }
  const item = document.createElement('p')
  item.className = 'toast'
  item.textContent = message
  region.append(item)
  window.setTimeout(() => item.remove(), duration)
}
