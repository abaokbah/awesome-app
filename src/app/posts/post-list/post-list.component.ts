import { Component, OnInit, OnDestroy } from "@angular/core";

import { Post } from "../post.model";
import { PostsService } from '../posts.service';
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})

export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];

  postService: PostsService;

  private postSub = new Subscription();

  constructor(postsService: PostsService) {
    this.postService = postsService;
    // There's a shorter form to declare this.. refer to vid#27
  }

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postSub = this.postService.getPostUpdatedListener()
      .subscribe((post:Post[]) => {
        this.posts = post;
      });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
