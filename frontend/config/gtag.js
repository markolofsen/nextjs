export const GA_TRACKING_ID = 'UA-89615648-1'


export const GOOGLE_ANALYTICS = `
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', '${GA_TRACKING_ID}');
`


// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
	window.gtag('config', GA_TRACKING_ID, {page_location: url})
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({action, category, label, value}) => {
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value: value
	})
}
