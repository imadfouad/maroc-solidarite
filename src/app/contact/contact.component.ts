import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  emailForm: FormGroup;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.emailForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      message: ["", Validators.required]
    });
  }

  onSubmit() {
    
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')!.value;
      const message = this.emailForm.get('message')!.value;

      // Set the url with your secretKey from formspree.io
      const url = 'https://formspree.io/f/mrgwknwl';

      // Set Headers
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };

      const data = `email=${email}&message=${message}`;
      let errorMessage: string = "";

      this.httpClient.post<any>(url, data, httpOptions).subscribe({
        next: () => {
          this.successMessage = 'Email envoyé avec succès!';
          this.emailForm.reset(); // Réinitialise le formulaire après l'envoi réussi
        },
        error: (error) => {
          errorMessage = error.message;
          console.error('Erreur:', errorMessage);
        }
      });
    }
  }
}
