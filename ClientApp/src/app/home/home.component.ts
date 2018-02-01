import { Component, OnInit  } from '@angular/core';
import { Pirate } from "./pirate.model";
import { HomeService } from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeService]
})
export class HomeComponent implements OnInit 
{ 
  fileToUpload: File = null; 
  constructor(private homeService: HomeService) 
  { 
  }

  ngOnInit(): void 
  {
    // this.homeService.GetAll();
    // this.homeService.GetAll2();
    // this.homeService.GetAll3();

    // this.homeService.GetById(1);
    // this.homeService.GetByIdWithParams(1);
    // this.homeService.GetByIdWithHeaders(1);

    // let pirate: Pirate = {
    //   id: 0,
    //   name : "Roronova Zoro",
    //   nickName : "Pirate hunter",
    //   crewName : "Straw Hat Pirates",
    //   position : "Swordsman",
    //   bounty: 320000000
    // };
    // this.homeService.Create(pirate);

    // let pirateUpdated: Pirate = {
    //   id: 0,
    //   name : "Roronova Zoro",
    //   nickName : "Pirate hunter",
    //   crewName : "Straw Hat Pirates",
    //   position : "Sword sman",
    //   bounty: 320000000
    // };
    // this.homeService.Update(1, pirateUpdated);

    // this.homeService.Delete(1);
  }

  onFileChange(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onUpload(){
    this.homeService.UploadFile(this.fileToUpload);
  }



}
