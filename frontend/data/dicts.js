export function user_menu_func(store) {
	const menu = [
		{
			icon: 'schedule',
			icon_font: false,
			route: 'user_orders',
			params: {},
			label: 'menu__orders-outcome',
		},
		{
			icon: 'schedule',
			icon_font: false,
			route: 'user_orders_income',
			params: {},
			label: 'menu__orders-income',
		},
		{
			icon: 'gavel',
			icon_font: false,
			route: 'user_ads',
			params: {},
			label: 'menu__my-ads',
		},
		{
			icon: 'bar_chart',
			icon_font: false,
			route: 'user_affiliate',
			params: {},
			label: 'menu__affiliate-program',
		},
		{
			icon: 'attach_money',
			icon_font: false,
			route: 'user_balance',
			params: {},
			label: 'menu__balance',
			label_addon: store.logged ? `+${store.logged.balance}` : '',
		},
		{
			icon: 'settings',
			icon_font: false,
			route: 'user_settings',
			params: {},
			label: 'menu__my-settings',
		},
	];
	return menu
}


export const main_menu_arr = [
	{
		icon: 'home',
		icon_font: false,
		route: 'index',
		params: {},
		label: 'menu__home',
		top: false,
	},
	{
		icon: 'star',
		icon_font: false,
		route: 'catalog',
		params: {
			direction: 'sell',
		},
		label: 'menu__catalog_buy',
		top: true,
	},
	{
		icon: 'star',
		icon_font: false,
		route: 'catalog',
		params: {
			direction: 'buy',
		},
		label: 'menu__catalog_sell',
		top: true,
	},
	{
		icon: 'help_outline',
		icon_font: false,
		route: 'faq',
		params: {},
		label: 'menu__faq',
		top: false,
	},
	{
		icon: 'help_outline',
		icon_font: false,
		route: 'support',
		params: {},
		label: 'menu__support-service',
		top: false,
	},
	{
		icon: 'help_outline',
		icon_font: false,
		route: 'earnings',
		params: {},
		label: 'menu__earnings',
		top: true,
	},
];



export const languages_arr = [
	{
		label: "English",
		code: "en"
	}, {
		label: "Russian",
		code: "ru"
	}, {
		label: "Spanish",
		code: "es"
	}, {
		label: "German",
		code: "de"
	}, {
		label: "France",
		code: "fr"
	}, {
		label: "Chinese",
		code: "cn"
	}, {
		label: "Hindi",
		code: "hi"
	}, {
		label: "Indonesian",
		code: "id"
	}
];


export const social_links = [
	{
		'name': 'Instagram',
		'icon': 'instagram',
		'link': 'https://www.instagram.com/kupibtc/'
	}, {
		'name': 'Facebook',
		'icon': 'facebook-official',
		'link': 'https://www.facebook.com/www.kupi.ru/'
	}, {
		'name': 'Twitter',
		'icon': 'twitter-square',
		'link': 'https://twitter.com/kupiru'
	}, {
		'name': 'Telegram',
		'icon': 'telegram',
		'link': 'https://t.me/kupinet'
	},
];


export const left_menu_arr = [
	{
		"label": "BTC (BitCoin)",
		"params": {
			"page": "bitcoin",
			"currency": "BTC"
		},
		"route": "catalog_page",
		"value": "BTC"
	}, {
		"label": "ETH (Ethereum)",
		"params": {
			"page": "ethereum",
			"currency": "ETH"
		},
		"route": "catalog_page",
		"value": "ETH"
	}, {
		"label": "LTC (LiteCoin)",
		"params": {
			"page": "litecoin",
			"currency": "LTC"
		},
		"route": "catalog_page",
		"value": "LTC"
	}, {
		"label": "XMR (Monero)",
		"params": {
			"page": "monero",
			"currency": "XMR"
		},
		"route": "catalog_page",
		"value": "XMR"
	}, {
		"label": "DASH (Dash)",
		"params": {
			"page": "dash",
			"currency": "DASH"
		},
		"route": "catalog_page",
		"value": "DASH"
	}, {
		"label": "XRP (Ripple)",
		"params": {
			"page": "ripple",
			"currency": "XRP"
		},
		"route": "catalog_page",
		"value": "XRP"
	}
];

export const locations_arr = [
	{
		"value": "AR",
		"label": "Argentina",
		"hidden": true,
		"hint": "AR"
	}, {
		"value": "AM",
		"label": "Armenia",
		"hidden": true,
		"hint": "AM"
	}, {
		"value": "AU",
		"label": "Australia",
		"hidden": true,
		"hint": "AU"
	}, {
		"value": "AT",
		"label": "Austria",
		"hidden": true,
		"hint": "AT"
	}, {
		"value": "BD",
		"label": "Bangladesh",
		"hidden": true,
		"hint": "BD"
	}, {
		"value": "BE",
		"label": "Belgium",
		"hidden": true,
		"hint": "BE"
	}, {
		"value": "BA",
		"label": "Bosnia and Herzegovina",
		"hidden": true,
		"hint": "BA"
	}, {
		"value": "BR",
		"label": "Brazil",
		"hidden": true,
		"hint": "BR"
	}, {
		"value": "BN",
		"label": "Brunei",
		"hidden": true,
		"hint": "BN"
	}, {
		"value": "BG",
		"label": "Bulgaria",
		"hidden": true,
		"hint": "BG"
	}, {
		"value": "CM",
		"label": "Cameroon",
		"hidden": true,
		"hint": "CM"
	}, {
		"value": "CA",
		"label": "Canada",
		"hidden": false,
		"hint": "CA"
	}, {
		"value": "CL",
		"label": "Chile",
		"hidden": true,
		"hint": "CL"
	}, {
		"value": "CN",
		"label": "China",
		"hidden": true,
		"hint": "CN"
	}, {
		"value": "CO",
		"label": "Colombia",
		"hidden": false,
		"hint": "CO"
	}, {
		"value": "CR",
		"label": "Costa Rica",
		"hidden": false,
		"hint": "CR"
	}, {
		"value": "HR",
		"label": "Croatia",
		"hidden": true,
		"hint": "HR"
	}, {
		"value": "CZ",
		"label": "Czechia",
		"hidden": true,
		"hint": "CZ"
	}, {
		"value": "DK",
		"label": "Denmark",
		"hidden": true,
		"hint": "DK"
	}, {
		"value": "DO",
		"label": "Dominican Republic",
		"hidden": true,
		"hint": "DO"
	}, {
		"value": "EC",
		"label": "Ecuador",
		"hidden": true,
		"hint": "EC"
	}, {
		"value": "EG",
		"label": "Egypt",
		"hidden": true,
		"hint": "EG"
	}, {
		"value": "EE",
		"label": "Estonia",
		"hidden": true,
		"hint": "EE"
	}, {
		"value": "FI",
		"label": "Finland",
		"hidden": true,
		"hint": "FI"
	}, {
		"value": "FR",
		"label": "France",
		"hidden": true,
		"hint": "FR"
	}, {
		"value": "GE",
		"label": "Georgia",
		"hidden": true,
		"hint": "GE"
	}, {
		"value": "GH",
		"label": "Ghana",
		"hidden": true,
		"hint": "GH"
	}, {
		"value": "HT",
		"label": "Haiti",
		"hidden": true,
		"hint": "HT"
	}, {
		"value": "HN",
		"label": "Honduras",
		"hidden": true,
		"hint": "HN"
	}, {
		"value": "HK",
		"label": "Hong Kong",
		"hidden": false,
		"hint": "HK"
	}, {
		"value": "HU",
		"label": "Hungary",
		"hidden": true,
		"hint": "HU"
	}, {
		"value": "IN",
		"label": "India",
		"hidden": true,
		"hint": "IN"
	}, {
		"value": "ID",
		"label": "Indonesia",
		"hidden": true,
		"hint": "ID"
	}, {
		"value": "IR",
		"label": "Iran",
		"hidden": false,
		"hint": "IR"
	}, {
		"value": "IE",
		"label": "Ireland",
		"hidden": true,
		"hint": "IE"
	}, {
		"value": "IL",
		"label": "Israel",
		"hidden": false,
		"hint": "IL"
	}, {
		"value": "IT",
		"label": "Italy",
		"hidden": false,
		"hint": "IT"
	}, {
		"value": "JE",
		"label": "Jersey",
		"hidden": true,
		"hint": "JE"
	}, {
		"value": "KZ",
		"label": "Kazakhstan",
		"hidden": true,
		"hint": "KZ"
	}, {
		"value": "KE",
		"label": "Kenya",
		"hidden": false,
		"hint": "KE"
	}, {
		"value": "LV",
		"label": "Latvia",
		"hidden": true,
		"hint": "LV"
	}, {
		"value": "LU",
		"label": "Luxembourg",
		"hidden": true,
		"hint": "LU"
	}, {
		"value": "MY",
		"label": "Malaysia",
		"hidden": true,
		"hint": "MY"
	}, {
		"value": "MX",
		"label": "Mexico",
		"hidden": true,
		"hint": "MX"
	}, {
		"value": "MN",
		"label": "Mongolia",
		"hidden": true,
		"hint": "MN"
	}, {
		"value": "MA",
		"label": "Morocco",
		"hidden": false,
		"hint": "MA"
	}, {
		"value": "MM",
		"label": "Myanmar",
		"hidden": true,
		"hint": "MM"
	}, {
		"value": "NA",
		"label": "Namibia",
		"hidden": true,
		"hint": "NA"
	}, {
		"value": "NL",
		"label": "Netherlands",
		"hidden": false,
		"hint": "NL"
	}, {
		"value": "NZ",
		"label": "New Zealand",
		"hidden": true,
		"hint": "NZ"
	}, {
		"value": "NG",
		"label": "Nigeria",
		"hidden": false,
		"hint": "NG"
	}, {
		"value": "NO",
		"label": "Norway",
		"hidden": true,
		"hint": "NO"
	}, {
		"value": "OM",
		"label": "Oman",
		"hidden": true,
		"hint": "OM"
	}, {
		"value": "PK",
		"label": "Pakistan",
		"hidden": false,
		"hint": "PK"
	}, {
		"value": "PA",
		"label": "Panama",
		"hidden": false,
		"hint": "PA"
	}, {
		"value": "PY",
		"label": "Paraguay",
		"hidden": true,
		"hint": "PY"
	}, {
		"value": "PE",
		"label": "Peru",
		"hidden": true,
		"hint": "PE"
	}, {
		"value": "PH",
		"label": "Philippines",
		"hidden": true,
		"hint": "PH"
	}, {
		"value": "PL",
		"label": "Poland",
		"hidden": true,
		"hint": "PL"
	}, {
		"value": "PT",
		"label": "Portugal",
		"hidden": false,
		"hint": "PT"
	}, {
		"value": "QA",
		"label": "Qatar",
		"hidden": true,
		"hint": "QA"
	}, {
		"value": "MK",
		"label": "Republic of Macedonia",
		"hidden": true,
		"hint": "MK"
	}, {
		"value": "RO",
		"label": "Romania",
		"hidden": false,
		"hint": "RO"
	}, {
		"value": "RU",
		"label": "Russian Federation",
		"hidden": true,
		"hint": "RU"
	}, {
		"value": "WS",
		"label": "Samoa",
		"hidden": true,
		"hint": "WS"
	}, {
		"value": "SA",
		"label": "Saudi Arabia",
		"hidden": true,
		"hint": "SA"
	}, {
		"value": "RS",
		"label": "Serbia",
		"hidden": true,
		"hint": "RS"
	}, {
		"value": "SC",
		"label": "Seychelles",
		"hidden": true,
		"hint": "SC"
	}, {
		"value": "SG",
		"label": "Singapore",
		"hidden": true,
		"hint": "SG"
	}, {
		"value": "SK",
		"label": "Slovakia",
		"hidden": true,
		"hint": "SK"
	}, {
		"value": "ZA",
		"label": "South Africa",
		"hidden": true,
		"hint": "ZA"
	}, {
		"value": "ES",
		"label": "Spain",
		"hidden": false,
		"hint": "ES"
	}, {
		"value": "LK",
		"label": "Sri Lanka",
		"hidden": true,
		"hint": "LK"
	}, {
		"value": "SZ",
		"label": "Swaziland",
		"hidden": true,
		"hint": "SZ"
	}, {
		"value": "SE",
		"label": "Sweden",
		"hidden": true,
		"hint": "SE"
	}, {
		"value": "CH",
		"label": "Switzerland",
		"hidden": true,
		"hint": "CH"
	}, {
		"value": "TW",
		"label": "Taiwan",
		"hidden": true,
		"hint": "TW"
	}, {
		"value": "TZ",
		"label": "Tanzania",
		"hidden": true,
		"hint": "TZ"
	}, {
		"value": "TH",
		"label": "Thailand",
		"hidden": true,
		"hint": "TH"
	}, {
		"value": "TG",
		"label": "Togo",
		"hidden": true,
		"hint": "TG"
	}, {
		"value": "TT",
		"label": "Trinidad and Tobago",
		"hidden": true,
		"hint": "TT"
	}, {
		"value": "TR",
		"label": "Turkey",
		"hidden": false,
		"hint": "TR"
	}, {
		"value": "UA",
		"label": "Ukraine",
		"hidden": true,
		"hint": "UA"
	}, {
		"value": "AE",
		"label": "United Arab Emirates",
		"hidden": true,
		"hint": "AE"
	}, {
		"value": "GB",
		"label": "United Kingdom",
		"hidden": false,
		"hint": "GB"
	}, {
		"value": "US",
		"label": "United States",
		"hidden": false,
		"hint": "US"
	}, {
		"value": "UY",
		"label": "Uruguay",
		"hidden": true,
		"hint": "UY"
	}, {
		"value": "VE",
		"label": "Venezuela",
		"hidden": false,
		"hint": "VE"
	}, {
		"value": "VN",
		"label": "Vietnam",
		"hidden": true,
		"hint": "VN"
	}, {
		"value": "ZW",
		"label": "Zimbabwe",
		"hidden": true,
		"hint": "ZW"
	}
];
