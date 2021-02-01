import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../models';
import { CountriesService } from '../services';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { map } from 'rxjs/operators';

const REGION_OPTIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  private source: Country[];
  searchFilter?: string;
  regionFilter?: string;
  regionOptions = REGION_OPTIONS;
  
barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Highes populatin country' }
  ];


  constructor(
    private countriesService: CountriesService,
	private route: ActivatedRoute
	) {
		  this.countriesService.getAll().pipe(map((resp:any) =>
    resp.rates.slice(0,5) )).subscribe(resp => {
      resp.forEach(item => {
        this.barChartLabels.push(item.name);
    })
  })
	}

  ngOnInit(): void {
    this.countriesService.getAll().subscribe((countries) => {
      this.source = countries;
    });
  }

  	getCountries(): void {
		this.countriesService.getAll().subscribe(countries => this.source = countries);
	}
	
	checkAllCheckBox(ev) {
		this.source.forEach(x => x.checked = ev.target.checked)
	}

	isAllCheckBoxChecked() {
		return this.source.every(c => c.checked);
  }
  get countries() {
    return this.source
      ? this.source
          .filter((country) =>
            this.searchFilter
              ? country.name
                  .toLowerCase()
                  .includes(this.searchFilter.toLowerCase())
              : country
          )
          .filter((country) =>
            this.regionFilter
              ? country.region.includes(this.regionFilter)
              : country
          )
      : this.source;
  }

  
}
