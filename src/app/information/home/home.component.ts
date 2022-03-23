import {Component, OnInit} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faCalendar = faCalendar;
  hoveredDate: NgbDate | undefined = undefined;

  fromDate: NgbDate | undefined = undefined;
  toDate: NgbDate | undefined = undefined;

  today = this.calendar.getToday();

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    //this.fromDate = calendar.getToday();
    //this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | undefined, input: string): NgbDate | undefined {
    const parsed = this.formatter.parse(input);
    if (!parsed || !this.calendar.isValid(NgbDate.from(parsed))){
      return currentValue;
    }
    return NgbDate.from(parsed) ?? undefined;
  }


}
