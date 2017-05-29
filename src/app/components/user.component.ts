import { Component } from '@angular/core';
import { PostService } from '../services/posts.service';

@Component({
    // enables relative paths, 'user.component.html' would not work if we did not put module.id
    moduleId: module.id, 
    selector: 'user',
    //template: ``, not neccesary anymore if we use external html file.
    templateUrl: 'user.component.html',
    providers: [PostService]
})
export class UserComponent  { 
  name: string;
  email: string;
  address: IAddress;
  hobbies: string[];
  showHobbies: boolean;
  posts: IPosts[];

  constructor(private postsService: PostService){

    console.log('from constructor');

    this.name = 'Ivana';
    this.email = "a@gmali.com";
    this.address = {
        street: "Wyckham Point",
        city: "Dublin",
        country: "IRE"
    }
    this.hobbies = ["Music", "Movies", "Hiking"];
    this.showHobbies = true;

// returns observable, so we have to subscribe
    this.postsService.getPosts().subscribe(posts => {
        //console.log(posts);
        this.posts = posts;
    });
  }

  toggleHobbies(){
    this.showHobbies = !this.showHobbies;
  }

  addHobby(hobby:string){
    this.hobbies.push(hobby);
  }

  deleteHobby(i:number){
      this.hobbies.splice(i, 1);
  }

}

interface IAddress {
    street: string,
    city:string,
    country:string;
}

interface IPosts{
    id: number,
    title: string,
    body: string
}