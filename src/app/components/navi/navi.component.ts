import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userInfo: User = this.authService.getUser();

  constructor(private authService: AuthService, private localStorageService: LocalStorageService, private router: Router, private toastrService:ToastrService) {
  }

  ngOnInit(): void {
  }


  isAuthenticated() {
    return this.authService.loggedIn();
  }


  logout() {
    this.localStorageService.removeToken();
    this.toastrService.success('Logged Out.')
  }


  ngDoCheck() { 
    if (this.userInfo !== this.authService.user) {
      this.userInfo = this.authService.user;
    }

  }

  goToAdminEdit() {
    this.router.navigate(['adminEdit']);
  }

}
