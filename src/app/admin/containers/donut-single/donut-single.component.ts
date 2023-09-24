import { Component } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donut-single',
  template: `
    <div>
      <app-donut-form
        [donut]="donut"
        [isEdit]="isEdit"
        (create)="onCrreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      ></app-donut-form>
    </div>
  `,
  styles: [],
})
export class DonutSingleComponent {
  donut!: Donut;
  isEdit! : boolean


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donutService: DonutService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.donutService
      .readOne(id)
      .subscribe((donut: Donut) => (this.donut = donut));

      this.isEdit = this.route.snapshot.data.isEdit;
  }
  // console.log('test')
  // this.onCrreate;

  onCrreate(donut: Donut) {
    // console.log('test')
    this.donutService.create(donut).subscribe((donut) => this.router.navigate(['admin','donuts',donut.id]));
    console.log('working');
  }

  onUpdate(donut: Donut) {
    // console.log('test')
    this.donutService.update(donut).subscribe({
      next: ()=> this.router.navigate(['admin']),
      error:(err) => {console.log("updation error", err)}});
  }
  onDelete(donut: Donut) {
    this.donutService.delete(donut).subscribe(() => this.router.navigate(['admin']));
  }
}
