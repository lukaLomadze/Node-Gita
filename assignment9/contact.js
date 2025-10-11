class ContactManager {
    constructor() {
        this.contacts = [];
    }

    addNewContact(contact) {
        const checkEmail = this.contacts.some(c => c.email === contact.email);
        const checkPhone = this.contacts.some(c => c.phone === contact.phone);

        if (checkEmail || checkPhone) {
            console.log("Contact with this email or phone already exists.");
            return;
        }
        this.contacts.push(contact);
    }

    viewAllContacts() {
        return this.contacts;
    }

    updatePhone(email, newPhone) {
        const contact = this.contacts.find(c => c.email === email);
        if (contact) contact.phone = newPhone;
    }

    deleteContact(email) {
        this.contacts = this.contacts.filter(c => c.email !== email);
    }
}


const cm = new ContactManager();
cm.addNewContact({ name: "Luka", phone: "555123123", email: "luka@mail.com" });
cm.addNewContact({ name: "Lukaa", phone: "555123124", email: "luka@mail.com" });
cm.addNewContact({ name: "Lukaaagit ", phone: "555123123", email: "lukaa@mail.com" });
cm.addNewContact({ name: "nika", phone: "555456456", email: "nika@mail.com" });
console.log(cm.viewAllContacts());
cm.updatePhone("luka@mail.com", "555999777");
console.log(cm.viewAllContacts());
