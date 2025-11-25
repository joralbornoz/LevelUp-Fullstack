package cl.duoc.levelup.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Schema;
import cl.duoc.levelup.model.Compra;
import cl.duoc.levelup.service.CompraService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Compras", description = "Controlador para gestión de compras")
@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    @Autowired
    private CompraService compraService;


    @Data
    public static class ItemRequest {
        @Schema(description = "Código del producto", example = "ABC123")
        private String codigoProducto;
        @Schema(description = "Nombre del producto", example = "Laptop")
        private String nombreProducto;
        @Schema(description = "Cantidad de productos", example = "2")
        private Integer cantidad;
        @Schema(description = "Precio unitario del producto", example = "500000")
        private Integer precioUnitario;
    }


    @Data
    public static class CompraRequest {
        @Schema(description = "Total de la compra", example = "1000000")
        private Integer total;
        @Schema(description = "Lista de items en la compra")
        private List<ItemRequest> items;
    }
    @Operation(
            summary = "Registrar una nueva compra",
            description = "Permite registrar una compra realizada por un usuario.")
    @PostMapping("/usuario/{idUsuario}")
    public Compra registrarCompra(
            @Parameter(description = "ID del usuario que realiza la compra", required = true)
            @PathVariable Long idUsuario,
            @Parameter(description = "Datos de la compra", required = true)
            @RequestBody CompraRequest request
    ) {
        return compraService.registrarCompra(idUsuario, request);
    }
    @Operation(
            summary = "Obtener compras de un usuario",
            description = "Devuelve la lista de compras realizadas por un usuario específico.")
    @GetMapping("/usuario/{idUsuario}")
    public List<Compra> obtenerComprasUsuario(
            @Parameter(description = "ID del usuario", required = true)
            @PathVariable Long idUsuario) {
        return compraService.obtenerComprasUsuario(idUsuario);
    }
}
