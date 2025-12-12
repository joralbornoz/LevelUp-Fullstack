package cl.duoc.levelup.catalogservice.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Entity
@Table(name = "compras")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Compra {

    @Id
    @Schema(description = "Identificador único de la compra", example = "1")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @Schema(description = "Usuario que realiza la compra",
            example = "{ \"id\": 1 }")
    private Usuario usuario;
    @Schema(description = "Fecha y hora de la compra",
            example = "2025-11-24T13:52:16.529837")
    private LocalDateTime fecha;
    @Schema(description = "Total en centavos",
            example = "144960")
    private Integer total;
    @Column(length = 500)
    @Schema(description = "Detalle adicional de la compra",
            example = "Catan x2, Carcassonne x1, Controlador Xbox")
    private String detalle;
}
