package cl.duoc.levelup.authservice.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "mi-secreto-super-largo-para-firmar-jwt-123456";
    private final long EXPIRATION_MS = 1000 * 60 * 60; // 1 hora

    private Key getKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }


    public String generarToken(String email, String rol) {
        Date ahora = new Date();
        Date expiracion = new Date(ahora.getTime() + EXPIRATION_MS);

        return Jwts.builder()
                .setSubject(email)
                .claim("rol", rol)
                .setIssuedAt(ahora)
                .setExpiration(expiracion)
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String obtenerSubject(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean esTokenValido(String token, UserDetails userDetails) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String email = claims.getSubject();
            Date exp = claims.getExpiration();

            return email.equals(userDetails.getUsername()) && exp.after(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}



