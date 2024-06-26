import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  constructor(private route: ActivatedRoute, private contactService: ContactsService, private router: Router) { }
 
  contactForm = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    dateOfBirth: new FormControl(),
    favoritesRanking: new FormControl(),
    phone: new FormGroup({
      phoneNumber: new FormControl(),
      phoneType: new FormControl()
    }),
    address: new FormGroup({
      streetAddress: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      postalCode: new FormControl(),
      addressType: new FormControl()
    })
  });

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactService.getContact(contactId).subscribe((contact)=>{
      if(!contact)return;
        this.contactForm.controls.firstName.setValue(contact.firstName);
        this.contactForm.controls.lastName.setValue(contact.lastName);
        this.contactForm.controls.dateOfBirth.setValue(contact.dateOfBirth);
        this.contactForm.controls.favoritesRanking.setValue(contact.favoritesRanking);

        this.contactForm.controls.phone.controls.phoneNumber.setValue(contact.phone.phoneNumber);
        this.contactForm.controls.phone.controls.phoneType.setValue(contact.phone.phoneType);

        this.contactForm.controls.address.controls.streetAddress.setValue(contact.address.streetAddress);
        this.contactForm.controls.address.controls.city.setValue(contact.address.city);
        this.contactForm.controls.address.controls.state.setValue(contact.address.state);
        this.contactForm.controls.address.controls.postalCode.setValue(contact.address.postalCode);
        this.contactForm.controls.address.controls.addressType.setValue(contact.address.addressType);

    });
  }

  saveContact() {
    this.contactService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }
}
