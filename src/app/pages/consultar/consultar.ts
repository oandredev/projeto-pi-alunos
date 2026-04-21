import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlunosService } from '../../core/services/alunos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './consultar.html',
  styleUrl: './consultar.css'
})
export class Consultar {
  idBusca: string = '';
  aluno: any = null; 

  constructor(private alunosService: AlunosService) {}

  validarSomenteNumeros() {
    this.idBusca = this.idBusca.replace(/\D/g, '');
  }

  pesquisar() {
    if (!this.idBusca) {
      alert('Por favor, digite um ID.');
      return;
    }

    this.alunosService.buscarPorId(this.idBusca).subscribe({
      next: (dados) => {
        this.aluno = dados;
      },
      error: () => {
        alert('Aluno não encontrado!');
        this.aluno = null;
      }
    });
  }
}