import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../core/types/types';
import { AlunosService } from '../../core/services/alunos';
import { CommonModule } from '@angular/common'; // Importante para o @for funcionar
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listagem',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './listagem.html',
  styleUrl: './listagem.css',
})
export class Listagem implements OnInit {
  listaAlunos: Aluno[] = [];
  
   constructor(private alunosService: AlunosService) {}

  ngOnInit(): void {
    // Agora usando o nome correto: alunosService
    this.alunosService.listar().subscribe((alunos) => {
      this.listaAlunos = alunos;
    });
  }

  // Esse método serve para excluir um aluno da lista e atualizar a tela automaticamente
  excluir(id: string) {
    const confirmacao = confirm("Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita.");

    if (confirmacao) {
      this.alunosService.excluir(id).subscribe({
        next: () => {
          alert("Aluno excluído com sucesso!");
          this.ngOnInit(); // Recarrega a lista
        },
        error: (err: any) => {
          alert("Erro ao excluir o aluno."); // esse erro aqui só acontece se eu desconectar o banco, por exemplo.
          console.error(err);
        }
      });
    } else {
      console.log("Exclusão cancelada pelo usuário."); // aqui aparece só no console.log, informando a tentativa do usuário
    }
  }
}