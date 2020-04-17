import { Regiao } from './../models/regiao';
import { Dados } from './../models/dados';
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;
  dadosCovid: Dados = {} as Dados;


  ionViewDidEnter() {
    this.consultarDadosAtuais();
  }

  constructor(private httpClient: HttpClient) { }

  private REST_API_COVID_ATUAL = "https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true";

   public async consultarDadosAtuais() {
    await this.httpClient.get(this.REST_API_COVID_ATUAL).subscribe(
      data => {

        this.dadosCovid.dataAtualizacao = data.lastUpdatedAtSource;
        this.dadosCovid.origem = data.sourceUrl;
        this.dadosCovid.falecido = data.deceased;
        this.dadosCovid.infectado = data.infected;
        this.dadosCovid.infectadoRegiao = [];
        this.dadosCovid.falecidoRegiao = [];


        data.infectedByRegion.forEach(regiaoInfectada => {
          let regiao = new Regiao();
          regiao.uf = regiaoInfectada.state;
          regiao.contador = regiaoInfectada.count;
          this.dadosCovid.infectadoRegiao.push(regiao);
        })

        data.deceasedByRegion.forEach(regiaoInfectada => {
          let regiao = new Regiao();
          regiao.uf = regiaoInfectada.state;
          regiao.contador = regiaoInfectada.count;
          this.dadosCovid.falecidoRegiao.push(regiao);
        })

        console.log(this.dadosCovid);
        this.createBarChart();

      }
    );
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Infectados', 'Falecidos'],
        datasets: [{
          label: 'Infectados x Falecidos',
          data: [this.dadosCovid.infectado, this.dadosCovid.falecido],
          backgroundColor: ['red', 'green'],
          borderColor: 'black',
          borderWidth: 1
        }]
      }
    });
}


}
