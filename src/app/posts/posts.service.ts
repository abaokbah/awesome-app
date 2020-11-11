import { Subject, Subscriber }  from "rxjs";
import { map }                  from "rxjs/operators";
import { Post }                 from "./post.model";
import { Injectable }           from '@angular/core';
import { HttpClient }           from "@angular/common/http";

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
    .get<{message: string; posts: any}>(
      "http://localhost:3000/api/posts" //pipe takes an observable
      ).pipe(map((hPost) => {
        return hPost.posts.map(post => {
          return {
                  title: post.title,
                  content: post.content,
                  id: post._id
                }
          })
      }))
    .subscribe((transformedPost) => {
      this.posts = transformedPost;
      this.postUpdated.next([...this.posts]);
    })
  }

  getPostUpdatedListener(){
    return this.postUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{ message: string, postId: string}>("http://localhost:3000/api/posts", post)
      .subscribe(hPost => {
        const id = hPost.postId;
        post.id = id;
        this.posts.push(post); // insert the new post, into the posts array defined above
        this.postUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string){
    // Code to send database
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
      console.log("Deleted");
    });
  }
}
