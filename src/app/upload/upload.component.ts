import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UploadService } from './upload.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] =  [];
  result: any;
  today: any;

  pageSize = 5;
  pageSizeOptions = [ 5, 10, 20, 30 ];

  constructor(public service: UploadService) {
    setInterval(() => { this.today = Date.now()}, 1);
  }

  ngOnInit() {
    this.service.getUpload();
    this.service.getUploadUpdateListener().subscribe(data => {
      this.result = new MatTableDataSource(this.trimData(data));

      setTimeout(() => {
        this.result.sort = this.sort;
        this.result.paginator = this.paginator;
      });

    });
  }

  trimData(data: any) {
    const listCsv = [];

    this.displayedColumns =
    ['status', 'porcentagem', 'possivelFP', 'gestor', 'grupo', 'sigla', 'ativo', 'qtd', 'vba', 'cod'];

    for (let i = 1; i < data.length; i++) {
      const curruntRecord = (data[i].FieldOne as string).split(';');
      const csvTarefa: any = {};
      csvTarefa.status = curruntRecord[0].trim();
      csvTarefa.porcentagem = curruntRecord[1].trim();
      csvTarefa.possivelFP = curruntRecord[2].trim();
      csvTarefa.grupo = curruntRecord[4].trim();
      csvTarefa.sigla = curruntRecord[5].trim();
      csvTarefa.ativo = curruntRecord[12].trim();
      csvTarefa.qtd = curruntRecord[25].trim();
      csvTarefa.vba = curruntRecord[13].trim();
      csvTarefa.cod = curruntRecord[18].trim();
      csvTarefa.gestor = curruntRecord[35].trim();
      listCsv.push(csvTarefa);
    }
    return listCsv;
  }
}
