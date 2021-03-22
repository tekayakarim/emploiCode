import { Component, OnInit } from '@angular/core';
import { ApiEnseignantService } from '../services/api-enseignant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stat:any=[];
  constructor(private apiService:ApiEnseignantService) { }

  ngOnInit(): void {
  }

}
