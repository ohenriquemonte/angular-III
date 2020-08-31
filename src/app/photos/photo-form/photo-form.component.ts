import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'ap-photo-form',
	templateUrl: './photo-form.component.html',
	styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

	photoForm: FormGroup;
	file: File;

	constructor(
		private formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.photoForm = this.formBuilder.group({
			file: ['', Validators.required],
			description: ['', Validators.maxLength(300)],
			allowComments: [true]
		});
	}

	upload() {
		// const dados = this.photoForm.getRawValue(); // nao é possível acessar propriedades file
		const description = this.photoForm.get(`description`).value;
		const allowComments = this.photoForm.get(`allowComments`).value;

		console.log(`description ${JSON.stringify(description)}`);
		console.log(`allowComments ${JSON.stringify(allowComments)}`);
		console.log(this.file);
	}
}