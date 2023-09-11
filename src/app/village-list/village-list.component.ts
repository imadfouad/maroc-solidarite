import { Component, OnInit } from '@angular/core';
import { FirestoreServiceService } from '../firestore-service.service';
import { VillageNeeds } from '../villageNeeds';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import {serverTimestamp } from 'firebase/firestore';

import 'firebase/compat/firestore';
import { Comment } from '../comment';

declare var $: any;


@Component({
  selector: 'app-village-list',
  templateUrl: './village-list.component.html',
  styleUrls: ['./village-list.component.css']
})
export class VillageListComponent implements OnInit {
  
  currentVillage: VillageNeeds | null = null;
  villageComments: any[] = [];
  newComment: string = '';
  searchTerm: string = '';

  villagesToAdd: VillageNeeds[] = [
    { nom: 'Ait Haddou | ايت حدو', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tadafalt | تدافالت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tansghart | تنصغارت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Asghmo | أسغمو', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tasli | تاسلى', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Timditane | تيمديتان', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tasghimout | تاسغيموت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ikis | إكيس', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Inzal | انزال', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Amasine | أماسين', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ait Hamou | ايت حمو', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Oulad Addi | أولادعدي', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Al Wus | الوس', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tanmitert | تانميترت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ahl Tifout | أهل تيفتوت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Talmoudat | تالمودات', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tamsoult | تامسولت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tawtighran | توطغران', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Asarak | أاساراك', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Arg | ارغ', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ikidi | إكيدى', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Agbar | اغبار', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Azghros | أازغروس', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Adsiar | ادسيار', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Amrgn | امرغنى', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Igoukak A | إيجوكاك ا', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Onayn | اوناين', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tamarot | تماروت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Izalagn | إيزالاغن', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Amizmiz | أميزميز', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Anerni | أنيرنى', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Aolouz | آولوز', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tadouni | تادوني', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Takoucht | تاكوشت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tamjout | تامجوت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Talyouine | تاليوين', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Iaagma | إيعغعرم', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Taghnit | تاغنيت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tafnout | تفنوت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Taajgalt | تاجغالت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ait Maalid | ايت معلد', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ifasfas | إفاسفاس', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tizi NTest | تيزى نتست', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Adbadi | أدبدىي', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Amkarnis | أمكرنيس', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Amghernis | أمغرنيس', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ikisan | إكيسان', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Agurd Ourig | أغرد أوريغ', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tikouka | تيكوكا', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Rkto | ركتو', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Waounsaout | واونساوت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Fnso | فنسو', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ighlamln | إغلملن', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Abdellah Ousaid | عبد الله أوسعيد', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Takoucht | تاكوشت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Adaw Mahmoud | اداومحمود', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Talbort | تالبورت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Imoulas | إيمولاس', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Iguel | إغيل', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Amassa | أماسا', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ait Mhanad | ايت محاند', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Lalla Aziza | لالة عزيزة', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Imintanout | إيمينتانوت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ain Tazdoutnout | عين تازدتونت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tamzkadyouin | تمزكاديوين', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ait Bahamah | ايت باحمه', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Nafis | نفيس', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Inzkarn | انزكارن', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tiznitakoucht | تيزى نتاكوشت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Takniet | تاكنيت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Talkejount | تالكجونت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Idouiran | إدويران', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Al Zawiyah An Nahlia | الزاوية النحلية', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Asif Al Mal | أسيف المال', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ait Aithman | ايت اعثمان', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Anierni | آنيرنى', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tafnighoult | تافنيغولت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Izakn | إزاكن', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tmisha | تميشا', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Imndar | امندار', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Inzkarn | انزكارن', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Hammam Adouiran | حمام ادويران', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ikidi | إكيدى', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Malaab Tansghart | ملعب تنصغارت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Anierni | آنيرنى', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Afouda | آفودا', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Azoran | ازوران', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Mzey | مزي', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tazka | تزكى', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Aqlou | أكلو', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Toufguine | توفغين', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Tashbibt | تاشبيبت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Zawiyat Al Maadin | زاوية المعدن', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Amazira | امازيرا', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Takhzennit | تخزنيت', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Douzr9 | دوزر9', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Akhfis - Amasine | اخفيس - اماسين', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ait Boured | ايت بورد', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Ait Mbarak | ايت مبارك', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Taoungast | تاونغاست', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Isbakn Ait Zghar | إسباكن ايت زغار', medicaments: 0, draps: 0, habits: 0, alimentation: 0 },
    { nom: 'Adsiar Amazighni | ادسيار أمزغنى', medicaments: 0, draps: 0, habits: 0, alimentation: 0 }
  ];
  
  
  villages: VillageNeeds[] = [];

  constructor(private firebaseService: FirestoreServiceService,
    private firestore: AngularFirestore // Injectez AngularFirestore
    ) { }

  ngOnInit(): void {
    this.firebaseService.getVillages().subscribe(changes => {
      this.villages = changes.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as VillageNeeds;
          return { id, ...data };  // Fusionnez l'ID avec les données
      });
      console.log(this.villages);
  });
}

async addVillages() {
  const batch = this.firestore.firestore.batch();

  this.villagesToAdd.forEach(village => {
    const villageRef = this.firestore.collection('villages').doc().ref;
    batch.set(villageRef, village);
  });

  return batch.commit();
}

increment(village: any, field: keyof VillageNeeds): void {
  village[field]++;
  this.updateVillageInFirestore(village.id, { [field]: village[field] });
}

decrement(village: any, field: keyof VillageNeeds): void {
  if (village[field] > 0) {
    village[field]--;
    this.updateVillageInFirestore(village.id, { [field]: village[field] });
  }
}

viewComments(village: VillageNeeds) {
  this.currentVillage = village;

  this.firestore
  .collection('villages')
  .doc(this.currentVillage.id)
  .collection('comments', ref => ref.orderBy('timestamp', 'desc'))
  .valueChanges()
  .subscribe(comments => {
    this.villageComments = comments.map(comment => {
      // Convert ISO string timestamp back to a date for display
      const date = new Date(comment['timestamp']);
      const displayTime = `${date.getHours()}:${date.getMinutes()}`;

      return {
        ...comment,
        displayTime
      };
    });

    // Assuming you're using Bootstrap's modal
    $('#commentsModal').modal('show');

  });
}

closeModal() {
  this.newComment = '';
  $('#commentsModal').modal('hide');
}

addComment(commentText: string): Promise<void> {
  const comment = {
      text: commentText,
      timestamp: new Date().toISOString() // Store as ISO string
  };
  this.newComment = '';

  return this.firestore
    .collection('villages')
    .doc(this.currentVillage?.id)
    .collection('comments')
    .add(comment)
    .then(() => {
        console.log('Comment added successfully');
    })
    .catch(err => {
        console.error('Error adding comment:', err);
    });
  
}






private updateVillageInFirestore(id: string, update: Partial<VillageNeeds>) {
  this.firestore.collection('villages').doc(id).update(update)
    .catch(error => {
      console.error("Erreur lors de la mise à jour du village:", error);
    });
}


}
