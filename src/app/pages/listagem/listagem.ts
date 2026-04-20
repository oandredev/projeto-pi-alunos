import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../core/types/types';
import { AlunosService } from '../../core/services/alunos';
import { CommonModule } from '@angular/common'; // Importante para o @for funcionar

@Component({
  selector: 'app-listagem',
  standalone: true, // Certifique-se que é standalone
  imports: [CommonModule], // Adicionado para dar suporte às diretivas do Angular
  templateUrl: './listagem.html',
  styleUrl: './listagem.css',
})
export class Listagem implements OnInit {
  listaAlunos: Aluno[] = [];

  // Mudei o nome aqui de 'service' para 'alunosService' para bater com o código abaixo
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
          alert("Erro ao excluir o aluno.");
          console.error(err);
        }
      });
    } else {
      console.log("Exclusão cancelada pelo usuário.");
    }
  }
}