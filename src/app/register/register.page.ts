
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app'
import AuthProvider = firebase.auth.AuthProvider;

import { AngularFirestore } from '@angular/fire/firestore'
// import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/Authentication.service';
import { Usuario } from '../models/Usuario';


@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	username: string = ""
	password: string = ""
	cpassword: string = ""
	authService: AuthenticationService;
	usuario;

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		// public user: UserService,
		public alertController: AlertController,
		public router: Router,
		authService: AuthenticationService,

	) {
		this.authService = authService;
	}

	ngOnInit() {
	}

	iniciar() {
		this.router.navigate(['/login'])
	}

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async register() {
		const { username, password, cpassword } = this
		if (password !== cpassword) {
			this.presentAlert('Error', 'Las contraseñas no coinciden')
		}

		const res = await this.afAuth.createUserWithEmailAndPassword(username, password)
		console.log(username, password)

		this.usuario = new Usuario(username, password, username);

		this.authService.registerUser(this.usuario).subscribe(

			datos => {
				if (datos['resultado'] == 'OK') {


				} else {
					console.log('error')
				}
			}
		)

		// this.afstore.doc(`users/${res.user.uid}`).set({
		// 	username
		// })

		// this.user.setUser({
		// 	username,
		// 	uid: res.user.uid
		// })

		this.presentAlert('Success', 'You are registered!')
		this.router.navigate(['/login'])

	}

}
