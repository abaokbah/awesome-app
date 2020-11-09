import { Subject } from "rxjs";
import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

// A posts service that serves as a mediator of a generic function
// related to posts

@Injectable({providedIn: "root"}) //>> another way to make a service available
export class PostsService{
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}
  getPosts() {
    // return [...this.posts]; // takes care of "true copying" the posts array
    this.http
    .get<{message: string; posts: Post[]}>(
      "http://localhost:3000/api/posts"
      )
    .subscribe((hPosts) => {
      this.posts = hPosts.posts;
      this.postUpdated.next([...this.posts]);
    })
  }

  getPostUpdatedListener(){
    return this.postUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.posts.push(post); // insert the new post, into the posts array defined above
    this.postUpdated.next([...this.posts]);
  }
}
