package cl.duoc.levelup.controller;

import cl.duoc.levelup.model.Compra;
import cl.duoc.levelup.service.CompraService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    @Autowired
    private CompraService compraService;


    @Data
    public static class ItemRequest {
        private String codigoProducto;
        private String nombreProducto;
        private Integer cantidad;
        private Integer precioUnitario;
    }


    @Data
    public static class CompraRequest {
        private Integer total;
        private List<ItemRequest> items;
    }

    @PostMapping("/usuario/{idUsuario}")
    public Compra registrarCompra(
            @PathVariable Long idUsuario,
            @RequestBody CompraRequest request
    ) {
        return compraService.registrarCompra(idUsuario, request);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Compra> obtenerComprasUsuario(@PathVariable Long idUsuario) {
        return compraService.obtenerComprasUsuario(idUsuario);
    }
}
