import { Component, NgModule } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
})

export class PostCreateComponent{
  newPost = 'Tell us something..';
  enteredText = '';

  public onClickAdd() {
    this.newPost = this.enteredText;
  }
}
