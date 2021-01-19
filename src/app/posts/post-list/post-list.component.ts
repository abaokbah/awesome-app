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
  isLoading = false;

  postService: PostsService;

  private postSub = new Subscription();

  constructor(private postsService: PostsService) {
    this.postService = postsService;
    // There's a shorter form to declare this.. refer to vid#27
  }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdatedListener()
      .subscribe((post:Post[]) => {
        this.isLoading = false;
        this.posts = post;
      });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
