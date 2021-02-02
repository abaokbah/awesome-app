import { Component, OnInit, OnDestroy } from "@angular/core";

import { Post } from "../post.model";
import { PostsService } from '../posts.service';
import { Subscription } from "rxjs";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})

export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  isLoading = false;
  userIsAuthenticated = false;

  postService: PostsService;

  private postSub = new Subscription();
  private authSub = new Subscription();

  constructor(private postsService: PostsService, private authService: AuthService) {
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
      this.userIsAuthenticated = this.authService.getIsAuthenticated()
      this.authSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      })
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
    this.authSub.unsubscribe();
  }

}
