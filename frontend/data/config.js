import axios from 'axios';

// console.log( process.env )

export const ENV = process.env.NODE_ENV || 'development';
export const isProduction = ENV === 'production' || ENV === 'production_dev';

export const apiDomain = isProduction ? 'https://kupi.net' : 'http://127.0.0.1:8000';



// export async function get(path) {
// 	const url = `${apiDomain}/api/${path}`
// 	console.log('---------')
// 	console.log(url)
// 	return await axios.get(url).then(res => res)
// }
// export async function send(path, data) {
// 	const url = `${apiDomain}/api/${path}`
// 	console.log('---------')
// 	console.log(url)
// 	return await axios.post(url, data).then(res => res)
// }


/*
 * UNIVERSAL API FETCHERS
 */
export class API {
  constructor(path) {

		const path_str = path.replace('{token}', new LOC().getLocal('user').token)
		this.path = `${apiDomain}/api/${path_str}`;
		console.log(this.path)
  }

	async get() {
    console.log(`GET`);
		return await axios.get(this.path).then(res => res)
  }
	async post(data={}) {
    console.log(`POST: ${data}`);
		return await axios.post(this.path, data).then(res => res)
  }
  async delete(data) {
    console.log(`DELETE`);
		return await axios.delete(this.path).then(res => res)
  }
}




/*
 * LOCAL STORAGE
 */
export class LOC {
	constructor() {
	}

	getLocal(variable) {
		if(typeof window !== 'undefined') {
			let d = localStorage.getItem(variable)
			if(d) return JSON.parse(d)
		}
		return false
	}
	setLocal(name, arr) {
		if(typeof window !== 'undefined') {
			const d = !arr ? false : JSON.stringify(arr)
			localStorage.setItem(name, d)
		}
		return true
	}
	getSession(variable) {
  	if(typeof window !== 'undefined') {
  		let d = sessionStorage.getItem(variable)
  		if(d) return JSON.parse(d)
  	}
  	return false
  }
	setSession(name, arr) {
  	if(typeof window !== 'undefined') {
  		const d = !arr ? false : JSON.stringify(arr)
  		sessionStorage.setItem(name, d)
  	}
  	return true
  }
}




export function jsonSerializer(json) {
	return Object.entries(json).map(pair => pair.map(encodeURIComponent).join('=')).join('&')
}

export function capitalize(value) {
	return value[0].toUpperCase() + value.slice(1)
}

export const numberFormatFunc = (x, decimal=0) => {
  if(!x) return '...';
  try {
  	const str = parseFloat(x).toFixed(decimal).split('.')

  	let prefix = str[0]
  	prefix = prefix.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  	if(decimal > 0) {
  		return `${prefix}.${str[1]}`
  	} else {
  		return prefix
  	}
  } catch(err) {
    return 'Error'
  }

}

//Auto Currying (автоматическое каррирование)
// import { Trans } from 'react-i18next'
export function wordPostfixPreset(t, type, number)  {


	let titles = ['no']
	let row_empty = ''

	if(type == 'reviews') {
		titles = ['reviews-1','reviews-3','reviews-10']
		row_empty = 'reviews_null'
	}
	else if(type == 'points') {
		titles = ['points-1','points-3','points-10']
		row_empty = 'points_null'
	}
	else if(type == 'customers') {
		titles = ['customers-1','customers-3','customers-10']
		row_empty = 'customers_null'
	}
  else if(type == 'traders') {
		titles = ['traders-1','traders-3','traders-10']
		row_empty = 'traders_null'
	}
	else if(type == 'deals') {
		titles = ['deals-1','deals-3','deals-10']
		row_empty = 'deals_null'
	}
	else if(type == 'offers') {
		titles = ['offers-1','offers-3','offers-10']
		row_empty = 'offers_null'
	}
	else if(type == 'messages') {
		titles = ['messages-1','messages-3','messages-10']
		row_empty = 'messages_null'
	}

	if(number > 0) {
		let cases = [2, 0, 1, 1, 1, 2];
	  let title = titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];

		return t(`postfixes__${title}`, {number: numberFormatFunc(number, 0)})
	} else {
		return t(`postfixes__${row_empty}`)
	}

}



// Colorized zeros in number
export function numConvert(value, fix=8) {

    if(typeof value === "undefined") {
        return ''
    }

    if(value.toString().length > 0 && (typeof(value) == 'string' || typeof(value) == 'number')) {
        let n = isNaN(value) ? 0 : value

            n = parseFloat(n).toPrecision(8)
            // n = n.split('e')[0]
            n = parseFloat(n).toFixed(fix)

        let b = n
        let c = n.toString().split('.')[1].split('').reverse()
        let iter = ""
        for(let i=0; i<c.length; i++) {
            if(c[i] == 0) {
                iter += "0"
                b = b.slice(0, -1)
            } else {
                break
            }
        }
        let resp = n
        if(iter.length > 1) {
            resp = `${b}<u data-zero>${iter}</u>`
        }
        // return `<strong>${n}</strong>`
        return resp

    } else {
        return ''
    }

}



// Token for API Authorization
let GLOBAL_RESPONSE_STATUS = true
function applyAxiosSettings() {
    axios.defaults.headers.common['Authorization'] = `Token TOKENBUMBER`;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
		axios.defaults.withCredentials = true;
 		axios.defaults.crossDomain = true;
		// axios.defaults.headers.common['Content-Type'] = 'application/json';

    axios.interceptors.response.use(response => {
        // soundsCollection('connection_error', false)

        GLOBAL_RESPONSE_STATUS = true
        return response;
    }, error => {

        // soundsCollection('connection_error', true)

        if (!error.response) {
            // console.log('Network error!')
            GLOBAL_RESPONSE_STATUS = 'Network error!'
        } else {
            console.log(error.response.status)
            GLOBAL_RESPONSE_STATUS = error.response.status
            return error.response
        }
        return Promise.reject(error.response);
    })


} applyAxiosSettings()
