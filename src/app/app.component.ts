import {
  Component,
  OnInit,
  AfterViewInit,
  signal,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, MatProgressSpinnerModule, FormsModule,MatSnackBarModule,MatInputModule,MatFormFieldModule],
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
  isSendingRequest = signal(false);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required]],
      service: [''],
      message: [''],
    });
  }

  ngOnInit() {
    // Initialize filtered projects
    this.filteredProjects = this.projects;
  }

  contactForm: FormGroup;
  private scriptURL =
    'https://script.google.com/macros/s/AKfycbyhf5_M5AAXTEdcSF2iqR3s1HnGW_JBf4fVM3JAPOjWrn4C7PJcdAIiwccteNXimlqBKw/exec';

  // onSubmit() {
  //   if (this.contactForm.invalid) {
  //     this.contactForm.markAllAsTouched();
  //     return;
  //   }
  //   console.log(this.contactForm.value);

  //   const formData = new FormData();
  //   formData.append("name", this.contactForm.get('name')?.value);
  //   formData.append("email", this.contactForm.get('email')?.value);
  //   formData.append("phone", this.contactForm.get('phone')?.value);
  //   formData.append("service", this.contactForm.get('service')?.value);
  //   formData.append("message", this.contactForm.get('message')?.value);

  //   fetch(this.scriptURL, { method: "POST", body: formData })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.success) {
  //         alert("Message sent successfully!");
  //         this.contactForm.reset();
  //       } else {
  //         alert("Failed to send message.");
  //       }
  //     })
  //     .catch(err => alert("Error: " + err));
  // }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.isSendingRequest.set(true);

    const formData = new FormData();
    Object.entries(this.contactForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    this.http.post<any>(this.scriptURL, formData).subscribe({
      next: (res) => {
        this.isSendingRequest.set(false);
        this.snackBar.open('✅ Form submitted successfully!', '❌', {
          duration: 3000, // auto-close after 3s
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar'] 
        });
      },
      error: (err) => {
          this.snackBar.open('❌ Failed to send message. Try again.', '❌', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'] 

        });
      },
    });
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
