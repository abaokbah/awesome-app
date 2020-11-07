import { Post } from "./post.model"
import { Subject } from "rxjs";
// import { Injectable } from '@angular/core';

// A posts service that serves as a mediator of a generic function
// related to posts

// @Injectable({providedIn: 'root'}) >> another way to make a service available
export class PostsService{
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts]; // takes care of "true copying" the posts array
  }

  getPostUpdatedListener(){
    return this.postUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post); // insert the new post, into the posts array defined above
    this.postUpdated.next([...this.posts]);
  }
}
