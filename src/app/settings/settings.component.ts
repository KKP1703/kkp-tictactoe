import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  theme: string;
  tilesize: string;
  link = '/board';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.theme = localStorage.getItem("theme") || 'light';
    this.tilesize = localStorage.getItem("tilesize") || 'large';
  }

  saveSettings() {
    localStorage.setItem("theme", this.theme);
    localStorage.setItem("tilesize", this.tilesize);
    this.router.navigateByUrl(this.link);
  }
}
