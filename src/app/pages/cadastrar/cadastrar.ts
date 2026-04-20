import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Aluno } from '../../core/types/types';
import { AlunosService } from '../../core/services/alunos';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-cadastrar',
  standalone: true, 
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css'
})
export class Cadastrar {
  titulo = 'Cadastro de Alunos';
  
  aluno: Aluno = {
    id: '',
    ra: '',
    nome: '',
    cep: '',
    nota01: 0,
    nota02: 0
  } as Aluno;

  constructor(
    private alunosService: AlunosService,
    private router: Router
  ) { }

 submeter() {
    // 1. O "Filtro": Só deixa passar se as notas forem válidas
    if (this.aluno.nota01 < 0 || this.aluno.nota01 > 10 || 
        this.aluno.nota02 < 0 || this.aluno.nota02 > 10) {
      
      alert('Atenção! As notas devem ser entre 0 e 10.');
      return; // para a execução aqui mesmo
    }

    // 2. O "Envio": Só acontece se o código não parou no 'return' acima
    this.alunosService.incluir(this.aluno).subscribe({
      next: () => {
        alert('Aluno cadastrado com sucesso!');
        this.router.navigate(['/listagem']); // quando der certo, eu jpa lanço para a página de listagem
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        alert('Erro ao salvar o aluno. Verifique a conexão.'); // tenho que testar esse erro
      }
    });
  }
}