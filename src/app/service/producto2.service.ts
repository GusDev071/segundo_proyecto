import { Injectable } from '@angular/core';
import * as https from 'https';

@Injectable({
  providedIn: 'root'
})
export class Producto2Service {

  constructor() { }
}
const options: https.RequestOptions = {
	method: 'POST',
	hostname: 'mymercat.p.rapidapi.com',
	port: null,
	path: '/category/',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
		'X-RapidAPI-Host': 'mymercat.p.rapidapi.com'
	}
};

const req = https.request(options, function (res) {
	const chunks: Buffer[] = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.write(JSON.stringify({
	categorylist: [{ name: 'Verdura' }]
}));
req.end();