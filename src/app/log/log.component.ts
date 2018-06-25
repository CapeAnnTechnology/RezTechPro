import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService, LogService, FilterService, UtilityService } from '../_services';
import { Subscription } from 'rxjs';
import { LogModel } from '../_models';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-admin',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  providers: [NGXLogger]
})
export class LogComponent implements OnInit, OnDestroy {
  pageTitle = 'Logs';
  logsSub: Subscription;
  logList: LogModel[];
  filteredLogs: LogModel[];
  loading: boolean;
  error: boolean;
  query = '';

  constructor(
    private title: Title,
    public auth: AuthService,
    private log: LogService,
    public utils: UtilityService,
    public fs: FilterService,
    private logger: NGXLogger
  ) {

    // this.logger.log('Viewing Admin Logs');
  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getLogList();
  }

  private _getLogList() {
    this.loading = true;
    // Get all (admin) logs
    this.logsSub = this.log
      .getLogs$()
      .subscribe(
        res => {
          this.logList = res;
          this.filteredLogs = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  searchLogs() {
    this.filteredLogs = this.fs.search(this.logList, this.query, '_id', 'mediumDate');
  }

  resetQuery() {
    this.query = '';
    this.filteredLogs = this.logList;
  }

  ngOnDestroy() {
    this.logsSub.unsubscribe();
  }

}