import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlunosService } from '../../core/services/alunos';

@Component({
  selector: 'app-excluir',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './excluir.html',
  styleUrl: './excluir.css'
})
export class Excluir {
  idParaExcluir: string = '';

  constructor(
    private alunosService: AlunosService,
    private router: Router
  ) { }

  validarSomenteNumeros() {
    if (this.idParaExcluir) {
      this.idParaExcluir = this.idParaExcluir.replace(/\D/g, '');
    }
  }

  confirmarExclusao() {
    if (!this.idParaExcluir.trim()) {
      alert('Por favor, digite um ID válido.');
      return;
    }

    if (confirm(`Tem certeza que deseja excluir o aluno com ID ${this.idParaExcluir}?`)) {
      this.alunosService.excluir(this.idParaExcluir).subscribe({
        next: () => {
          alert('Aluno removido com sucesso!');
          this.router.navigate(['/listagem']);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao excluir: Verifique se o ID existe.');
        }
      });
    }
  }
}