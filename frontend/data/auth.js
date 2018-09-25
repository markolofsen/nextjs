import {API, LOC} from './config'
import axios from 'axios'
// import store from './stores/store'

import L from '../routes'




async function setToken(token) {
	if(!token) {
		axios.defaults.headers.common['Authorization'] = false;
	} else {
		axios.defaults.headers.common['Authorization'] = `Token ${token}`;
	}
	return true
}



export async function auth(email, password) {

	return await new API('accounts/login/').post({email, password}).then(res => {
		if(res.status == 200) {
			new LOC().setLocal('affiliate', false) //remove affiliate code if registration success
			new LOC().setLocal('user', {email, token: res.data.token})
			tokenAuth(res.data.token)
			new LOC().setSession('auth', {token: res.data.token})
		} else {
			new LOC().setLocal('user', {email, token: false})
			setToken(false)
			new LOC().setSession('auth', false)
		}
		return res
	})
}



export async function tokenAuth() {
	try {
		if(typeof window !== 'undefined') {
			const d = new LOC().getLocal('user')

			if(typeof d.token !== 'undefined') {
				setToken(d.token)
				new API(`accounts/user-profile/`).get().then(res => {
					if(res.status == 200) {
						// store.initLogin(res.data)
						new LOC().setSession('auth', {token: d.token})
					} else {
						setToken(false)
						new LOC().setSession('auth', false)
					}
				})

			} else {
				// store.initLogin(false)
				setToken(false)
			}
		}
	} catch(err) {}
}

export async function logout(lang) {
	try {
		setToken(false)
		new LOC().setSession('auth', false)
		store.initLogin(false)
		let d = new LOC().getLocal('user')
		d.token = false
		new LOC().setLocal('user', d)
		L.Router.pushRoute('index', {lang})
	} catch(err) {}
}
