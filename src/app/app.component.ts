import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Camview - CCTV & Solar Installation';
  isMobileMenuOpen = false;
  activeFilter = 'all';
  projects = [
    {
      id: 1,
      title: 'Commercial CCTV Installation',
      category: 'cctv',
      image: 'assets/images/cctv-img.png',
      description: 'Complete surveillance system for a retail complex',
    },
    {
      id: 2,
      title: 'Residential Solar Installation',
      category: 'solar',
      image: 'assets/images/installation-residential.png',
      description: '5kW solar system for energy-efficient home',
    },
    {
      id: 3,
      title: 'Integrated Security System',
      category: 'security',
      image: 'assets/images/security.png',
      description: 'Complete security solution for corporate headquarters',
    },
    {
      id: 4,
      title: 'Warehouse Surveillance',
      category: 'cctv',
      image: 'assets/images/warehouse-survillence.png',
      description: 'High-definition monitoring system for logistics facility',
    },
    {
      id: 5,
      title: 'Hybrid Solar & Security System',
      category: 'solar',
      image: 'assets/images/hybrid-solar.png',
      description:
        'Hybrid system with integrated monitoring and power generation',
    },
    {
      id: 6,
      title: 'Commercial Solar Installation',
      category: 'solar',
      image: 'assets/images/commercial-solar.png',
      description: 'Large-scale commercial solar power installation',
    },
  ];

  filteredProjects = this.projects;

  constructor() {}

  ngOnInit() {
    // Initialize filtered projects
    this.filteredProjects = this.projects;
  }

  ngAfterViewInit() {
    /** HERO SECTION ANIMATION */
    gsap.from('.hero-content', {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top 80%',
      },
    });

    gsap.from('.hero-img', {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top 80%',
      },
    });


  }
  closeMenu() {
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
