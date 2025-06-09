import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals"

export function reportWebVitals() {
  getCLS(console.log)
  getFID(console.log)
  getFCP(console.log)
  getLCP(console.log)
  getTTFB(console.log)
}

export function sendToAnalytics(metric: any) {
  // Send to your analytics service
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", metric.name, {
      event_category: "Web Vitals",
      event_label: metric.id,
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
}

export function measurePerformance() {
  if (typeof window !== "undefined") {
    getCLS(sendToAnalytics)
    getFID(sendToAnalytics)
    getFCP(sendToAnalytics)
    getLCP(sendToAnalytics)
    getTTFB(sendToAnalytics)
  }
}
