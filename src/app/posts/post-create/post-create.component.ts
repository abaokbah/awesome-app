import { NgForm }                     from "@angular/forms"
import { Component, OnInit }          from "@angular/core";
import { PostsService }               from '../posts.service';
import { ActivatedRoute, ParamMap }   from '@angular/router';
import { Post }                       from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})

export class PostCreateComponent implements OnInit{
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;

  constructor(public postService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit;'
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content}
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  //@Output() postCreated = new EventEmitter();
  public onSavePost(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // }
    // this.postCreated.emit(post);
    if (this.mode === 'create') {
      this.postService.addPosts(form.value.title, form.value.content); }
    else {
      this.postService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
      console.log(form.value.title);
    }
    form.resetForm();
  }
}
