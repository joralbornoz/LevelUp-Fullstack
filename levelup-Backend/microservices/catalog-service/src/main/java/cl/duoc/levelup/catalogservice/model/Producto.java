package cl.duoc.levelup.catalogservice.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "productos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Producto {

    @Id
    @Schema(description = "Código único del producto", example = "JM001")
    private String codigo;
    @Schema(description = "Nombre del producto", example = "Catan")
    private String nombre;
    @Schema(description = "Categoría del producto", example = "JuegosDeMesa")
    private String categoria;
    @Schema(description = "Precio del producto en centavos", example = "29990")
    private Integer precio;
    @Schema(description = "Descripción del producto",
            example = "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.")
    private String descripcion;
    @Schema(description = "URL de la imagen del producto", example = "/img/catan.png")
    private String imagenUrl;
    @Schema(description = "Cantidad en stock", example = "20")
    private Integer stock;
}
