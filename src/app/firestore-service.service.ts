import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  constructor(private firestore: AngularFirestore) { }

  getCommentsForVillage(villageName: string) {
      // Changez la structure si nécessaire selon votre base de données Firestore.
      return this.firestore.collection('villages').doc(villageName).collection('comments').valueChanges();
  }

  addCommentToVillage(villageName: string, comment: string) {
    const commentsRef = this.firestore.collection('villages').doc(villageName).collection('comments');
    return commentsRef.add({ content: comment });
  }


  getVillages() {
    return this.firestore.collection('villages').snapshotChanges();
  }

  addVillage(village: any) {
    return this.firestore.collection('villages').add(village);
  }  

  updateAidCategory(villageId: string, category: string, amount: number) {
    return this.firestore.collection('villages').doc(villageId).update({ [category]: amount });
  }  

  deleteVillage(villageId: string) {
    return this.firestore.collection('villages').doc(villageId).delete();
  }
  
}
