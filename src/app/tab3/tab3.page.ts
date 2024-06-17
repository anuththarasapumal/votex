import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Chart, ChartOptions, registerables } from 'chart.js';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ActivatedRoute, Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';
import { Storage } from '@ionic/storage-angular';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private chart: am4charts.PieChart | undefined;
  all_user_data = {dsd:'',gnd:'', first_name:'',user_name: '', superuser_id: '', user_id: '', gnd_id: '', poli_party_id: '', }
  flt_value: any;
  pmt_value: any;

  poliparty_list: any = [];
  party_id='';

  reg_vote = {
    reg_vote: '' }
  interval: any;

  total_flt_vote: any;
  total_pmt_vote: any;

  constructor(
    private curdService: CurdService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private zone: NgZone
  ) { Chart.register(...registerables) }

  ionViewWillEnter() {
    this.storage.create();
    this.loadStorageData();
  }

  doRefresh() {
    this.interval = setInterval(() => {
      this.getData();
    }, 5000);
  }


  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.chart) {
      this.chart.dispose();
    }
  }

  async loadStorageData() {
    this.all_user_data = await this.storage.get('loged_user_data');
    this.getPolipartyData();
    this.getData();
  }
 
  // PMT Chart
  createPieChart(value: any) {
    this.total_flt_vote = value[0].total_flt_vote
    this.total_pmt_vote = value[0].total_pmt_vote
    let value_2 = 100 - value[0].pmt_vote_percentage
    let value_1 = value[0].pmt_vote_percentage
    this.pmt_value = value[0].pmt_vote_percentage

    // Apply theme
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    this.chart = am4core.create('pmtchart', am4charts.PieChart);

    // Add data
    this.chart.data = [
      { "value": value_2 },
      { "value": value_1 },
    ];
    let pieSeries = this.chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    // Remove default slice labels
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    // Add a label to the center of the chart
    let label = this.chart.seriesContainer.createChild(am4core.Label);
    label.text = `${'Permanent Votes'} ${value_1}${'%'}`;
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.paddingTop = -5;

    label.fill = am4core.color("#3880ff"); // Use the desired color code
    label.fontSize = 12;
    // Add and configure Series
    pieSeries.dataFields.value = "value";
    pieSeries.paddingTop = -5;
    pieSeries.dataFields.category = "category";
    let colorSet = new am4core.ColorSet();
    colorSet.list = ["#ACE1AF", "#006A4E"].map(color => am4core.color(color));
    pieSeries.colors = colorSet;
    pieSeries.startAngle = -90; // Adjust the start angle (0 is the default, 90 is a quarter turn clockwise)
    pieSeries.endAngle = -450;  // Ensure the pie chart is a full circle (360 + 90)
    // Create a Donut chart by making inner radius greater than 0
    this.chart.innerRadius = am4core.percent(70); // Adjust this percentage to control thickness

    // Add a legend
    // this.chart.legend = new am4charts.Legend();
  }

    // get poliparty data

    getPolipartyData() {
      this.curdService.getPoliparty().subscribe(poliparty_res => {
        this.poliparty_list = poliparty_res;
        console.log(this.poliparty_list)
      }, error => {
        console.error('Error:', error);
      });
    }
    
  // FLT Chart
  createFLTVots(value: any) {
    let value_2 = 100 - value[0].flt_vote_percentage
    let value_1 = value[0].flt_vote_percentage
    this.flt_value = value[0].flt_vote_percentage
    // Apply theme
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    this.chart = am4core.create('fltchart', am4charts.PieChart);

    // Add data
    this.chart.data = [
      { "value": value_2 },
      { "value": value_1 },
    ];
    let pieSeries = this.chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    let colorSet = new am4core.ColorSet();
    colorSet.list = ["#F0E68C", "#cf8800"].map(color => am4core.color(color));
    pieSeries.colors = colorSet;
    pieSeries.startAngle = -90; // Adjust the start angle (0 is the default, 90 is a quarter turn clockwise)
    pieSeries.endAngle = -450;  // Ensure the pie chart is a full circle (360 + 90)
    pieSeries.paddingTop = -5;

    // Remove default slice labels
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    // Add a label to the center of the chart
    let label = this.chart.seriesContainer.createChild(am4core.Label);
    label.text = `${'Floating Votes'} ${value_1}${'%'}`;
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fill = am4core.color("#3880ff"); // Use the desired color code
    label.fontSize = 12;
    label.paddingTop = -5;

    // Add and configure Series
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";

    // Create a Donut chart by making inner radius greater than 0
    this.chart.innerRadius = am4core.percent(70); // Adjust this percentage to control thickness

    // Add a legend
    // this.chart.legend = new am4charts.Legend();
  }


  goToProfile() {
    this.router.navigate(['profile']);
  }

  addData() {
    this.router.navigate(['data-form']);
  }

  showSmmery() {
    this.router.navigate(['data-summery']);
  }

  dataList() {
    this.router.navigate(['data-list']);
  }
  
  // get  Data
  getData() {
    console.log(this.all_user_data.gnd_id)
    this.curdService.getVoteSummery(this.all_user_data.gnd_id).subscribe(response => {
      console.log(response)
      let chart_values:any
       chart_values = response
    this.reg_vote.reg_vote = chart_values[0].reg_vote
      this.createPieChart(chart_values)
      this.createFLTVots(chart_values)
    }, error => {
      console.error('Error:', error);
      // Handle error here
    });
  }


}


