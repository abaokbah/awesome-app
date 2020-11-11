import { NgForm }         from "@angular/forms"
import { Component }      from "@angular/core";
import { PostsService }   from '../posts.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})

export class PostCreateComponent{
  enteredTitle = '';
  enteredContent = '';

  constructor(public postService: PostsService) {}

  //@Output() postCreated = new EventEmitter();
  public onClickAdd(form: NgForm) {
    if(form.invalid){
      return;
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // }
    // this.postCreated.emit(post);

    this.postService.addPosts(form.value.title, form.value.content)
    form.resetForm();
  }
}
